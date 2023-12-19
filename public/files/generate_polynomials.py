import hashlib
import numpy as np
import matplotlib.pyplot as plt

def bytes_to_large_int(b):
    return int.from_bytes(b, byteorder='big')

def gen_float(input_string):
    return bytes_to_large_int(hashlib.sha256(input_string.encode()).digest()[:2]) / 32768 - 1

def gen_bool(input_string):
    return int(hashlib.sha256(input_string.encode()).digest()[3]) % 2 == 0

def gen_multiple_float(input_string, num, min_distance, start_counter=0):
    ret = []
    counter = start_counter
    while len(ret) < num:
        x = gen_float(input_string + "||" + str(counter))
        if len(ret) == 0:
            ret.append(x)
        else:
            dist = min([abs(x - ret[i]) for i in range(len(ret))])
            if dist > min_distance:
                ret.append(x)
        counter += 1
    return ret

def normalize_roots(roots, left, right):
    # If the roots are too close to each other, the resulting polynomial will look ugly.
    # So normalize them to make the minimum = left and maximum = right.
    max_root = max(roots)
    min_root = min(roots)
    scale = (right - left) / (max_root - min_root)
    shift = right - max_root * scale
    return [root * scale + shift for root in roots]

# Compute the coefficients of the polynomial with roots at the given roots
# The roots may be in any order. They are all in the range [-1, 1]
# The polynomial should also pass the (0, 0) coordinate, i.e., the constant
# term is zero.
# The polynomial is (X-roots[0])(X-roots[1])...(X-roots[n-1])
def get_poly_with_roots(roots):
    # Initialize the polynomial with the constant term as 1
    polynomial = [1]

    # Iterate through the roots and build the polynomial
    for root in roots:
        # Multiply the current polynomial by (X - root)
        polynomial = np.polymul(polynomial, [1, -root])

    return polynomial

def inverse_derivative(polynomial):
    # Compute the inverse of the derivative of the polynomial
    return list(reversed([0] + [coeff / (i + 1) for i, coeff in enumerate(reversed(polynomial))]))

def max_min_of_poly(polynomial, roots):
    # Compute the maximum and minimum of the polynomial in the range [-1, 1]
    # These values will only appear at: the end points, i.e., -1 and 1, and the
    # roots of its derivative polynomial.

    critical_points = [-1, 1] + roots
    critical_values = [np.polyval(polynomial, point) for point in critical_points]

    # Find the maximum and minimum values
    max_value = max(critical_values)
    min_value = min(critical_values)

    return max_value, min_value

def normalize_polynomial(polynomial, roots):
    max_value, min_value = max_min_of_poly(polynomial, roots)
    normalize_factor = max(abs(max_value), abs(min_value))
    if normalize_factor < 0.00001:
        normalize_factor = 0.00001
    return [coeff / normalize_factor for coeff in polynomial]

# Test function to check if the polynomial evaluates to zero at its roots
def test_polynomial_at_roots():
    # Define a small tolerance for comparison
    tolerance = 1e-10

    # Test cases with different sets of roots
    test_cases = [
        [0.5, -0.2, 0.1],
        [-0.3, 0.4, -0.1, 0.2],
        [0.0],
        [-1.0, 1.0],
        [0.0, 0.0, 0.0],
        gen_multiple_float("test", 10)
    ]

    for roots in test_cases:
        # Get the polynomial with the given roots
        polynomial = get_poly_with_roots(roots)

        # Evaluate the polynomial at each root and check if it's close to zero
        for root in roots:
            result = np.polyval(polynomial, root)
            assert abs(result) < tolerance, f"Polynomial {polynomial} evaluation at {root} is not close to zero: {result}"


def draw_polynomial(polynomials, names, rows=1):
    # Generate x values for the plot
    x = np.linspace(-1, 1, 100)  # Adjust the range as needed

    # Create subplots
    cols = (len(polynomials)-1)//rows+1
    fig, axes = plt.subplots(rows, cols, figsize=(4*cols, 4*rows))
    axes = axes if rows == 1 else axes.flatten()

    for i, poly in enumerate(polynomials):
        y = np.polyval(poly, x)
        axes[i].plot(x, y, label='Polynomial', color='b')
        axes[i].set_xlabel('x')
        axes[i].set_ylabel('y')
        axes[i].set_ylim(-1, 1)
        axes[i].axhline(0, color='black',linewidth=0.5)
        axes[i].axvline(0, color='black',linewidth=0.5)
        axes[i].grid(color = 'gray', linestyle = '--', linewidth = 0.5)
        axes[i].legend([names[i]])
        extent = axes[i].get_window_extent().transformed(fig.dpi_scale_trans.inverted())
        plt.savefig(f"{names[i]}.svg", bbox_inches=extent)
    plt.show()

def save_polynomial(polynomials, names):    # Generate x values for the plot
    x = np.linspace(-1, 1, 100)  # Adjust the range as needed
    plt.clf()
    plt.figure(figsize=(6, 6))

    for i, poly in enumerate(polynomials):
        y = np.polyval(poly, x)
        plt.plot(x, y, label='Polynomial', color='b')
        plt.xlabel('x')
        plt.ylabel('y')
        plt.ylim(-1, 1)
        plt.axhline(0, color='black',linewidth=0.5)
        plt.axvline(0, color='black',linewidth=0.5)
        plt.grid(color = 'gray', linestyle = '--', linewidth = 0.5)
        plt.legend([names[i]])
        plt.savefig(f"{names[i]}.svg")

def gen_polynomial_from_string(input_string, num_roots, normalized_roots=False):
    # The min_distance here controls how close the roots can be to each other.
    # Can't be larger than 2/(num_roots-1), or it would be impossible to get these
    # number of roots.
    # In fact, there is still chance that the algorithm is trapped in an infinite loop if
    # the distance is larger than 1/(num_roots-1), in the unlucky case where the first
    # num_roots-1 are spaced by 2*min_distance.
    # Note that the larger this value is, the more alike the resulting polynomials
    # would look, which is also undesired. So set this parameter carefully.
    roots = gen_multiple_float(input_string, num_roots, min_distance=1/num_roots)
    flip = gen_bool(input_string)

    if normalized_roots:
        # Normalize the roots to the range [left, right] which is also randomly generated.
        # This is another strategy to prevent the roots from being too close to each other.
        # Like the min_distance, this also tends to make the polynomials look alike.
        left, right = gen_multiple_float(input_string, 2, min_distance=0, start_counter=1000)
        left = (left - 3) / 4 # Make left in the range [-1, -1/2]
        right = (right + 3) / 4 # Make right in the range [1/2, 1]
        roots = normalize_roots(roots, left, right)

    derivative_poly = get_poly_with_roots(roots)
    poly = inverse_derivative(derivative_poly)
    normalized_poly = normalize_polynomial(poly, roots)
    if flip:
        normalized_poly = np.negative(normalized_poly)
    # Note that in numpy, the polynomial coefficients are ordered from high to low
    # The rightmost is constant (which is always zero), and the leftmost is the leading
    # coefficient
    print(normalized_poly)
    return normalized_poly

if __name__ == "__main__":
    test_strings = [
        "test1", "test2", "test3", "test4",
        "test5", "test6", "test7", "test8"
    ]
    degree = 5
    polynomials = [
        gen_polynomial_from_string(s, degree - 1, True)
        for s in test_strings]
    draw_polynomial(polynomials, test_strings, rows = 2)
    save_polynomial(polynomials, test_strings)