import { animate, motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

import { Box } from "@mui/material"

const PATH_LIST = [
  "M83 249.15C83 249.15 89.04 93.95 112.93 93.95C127.79 93.95 125.21 171.17 152.52 172.57C179.82 173.96 171.35 247.53 193.7 248.26C221.17 249.15 221.83 93 221.83 93",
  "M83 93C84.39 119.88 86.69 146.77 90.04 173.48C92.4 192.29 95.22 211.19 100.64 229.4C101.89 233.59 103.32 237.82 105.96 241.3C107.06 242.75 108.39 244.07 110.05 244.79C115.7 247.23 120.28 240.61 122.76 236.55C127.32 229.08 129.61 220.23 131.28 211.73C134.98 192.94 143.1 171.14 152.06 171.14C163.51 171.14 167.42 194.12 173.04 210.7C175.48 217.9 177.27 225.32 180.1 232.38C181.87 236.8 186.57 247.68 193.22 245.39C194.19 245.06 194.96 244.31 195.63 243.53C200.6 237.73 202.93 229.23 205.03 222C207.51 213.5 209.4 204.82 210.99 196.12C212.07 190.2 213 184.25 213.81 178.29C219.37 137.27 221.7 93 221.7 93",
  "M80 242.51C83.09 226.91 87.3 211.4 92.6 196.41C98.73 179.08 113.18 139.88 138.27 156.53C145.1 161.06 149.87 167.81 152.9 175.28C157.8 187.35 171.23 203.43 186.07 198.99C197.74 195.49 204.29 178.25 208.37 168C213.23 155.81 216.91 143.16 220.13 130.46C223.1 118.75 225.72 106.92 227.77 95.01",
]

const NFTCard = props => {
  const { sx } = props

  const [pathIndex, setPathIndex] = useState(0)
  const progress = useMotionValue(pathIndex)

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 2,
      ease: "linear",
      onComplete: () => {
        if (pathIndex === PATH_LIST.length - 1) {
          progress.set(0)
          setPathIndex(0)
        } else {
          setPathIndex(pathIndex + 1)
        }
      },
    })

    return () => animation.stop()
  }, [pathIndex])

  return (
    <Box sx={sx}>
      <svg width="100%" height="auto" style={{ aspectRatio: "312/366" }} viewBox="0 0 312 366" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.88 2.09998C11.21 2.09998 3.26001 9.40997 2.23001 18.8C0.260009 33.96 10.41 40.86 10.41 40.86H39.65V20.87C39.65 10.5 31.25 2.09998 20.88 2.09998Z"
          fill="url(#paint0_linear_642_1648)"
          stroke="#050308"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M247.39 2.09998H20.8801C31.2501 2.09998 39.6501 10.5 39.6501 20.87V343.51C39.6501 354.93 48.9001 364.18 60.3201 364.18H266.15V20.87C266.15 10.5 257.75 2.09998 247.38 2.09998H247.39Z"
          fill="#ECCCA2"
          stroke="#050308"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path
          d="M302.84 323.41H77.8701C82.1001 327.77 84.7101 333.71 84.7101 340.26C84.7101 352.33 75.8801 362.33 64.3301 364.17H289.3C300.85 362.33 309.68 352.33 309.68 340.26C309.68 333.71 307.07 327.77 302.84 323.41Z"
          fill="url(#paint1_linear_642_1648)"
          stroke="#050308"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
        <path d="M48.23 61.2L224.78 61.2V14.34L48.23 14.34V61.2Z" stroke="#050308" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M47.8999 72.6001V251.04L77.6499 280.8H256.82V105.4L224.01 72.6001H47.8999Z" fill="#050308" />
        <mask id="mask0_642_1648" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="47" y="72" width="210" height="209">
          <path d="M47.8999 72.6001V251.04L77.6499 280.8H256.82V105.4L224.01 72.6001H47.8999Z" fill="white" />
        </mask>
        <g mask="url(#mask0_642_1648)">
          <path d="M-41.8801 84.5H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 101.85H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 119.21H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 136.56H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 153.92H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 171.27H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 188.62H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 205.98H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 223.33H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 240.68H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 258.04H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-41.8801 275.39H310.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M238.39 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M221.04 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M203.68 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M186.33 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M168.98 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M151.62 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M134.27 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M116.92 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M99.5598 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M82.21 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M64.8499 -4.87988V347.41" stroke="#ECCCA2" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M151.62 84.4202L146.95 97.2302H156.29L151.62 84.4202Z" fill="#ECCCA2" />
          <path d="M151.62 257.96L156.29 245.15H146.95L151.62 257.96Z" fill="#ECCCA2" />
          <path d="M152.62 95.7903H150.62V249.41H152.62V95.7903Z" fill="#ECCCA2" />
          <path d="M238.39 171.19L225.58 166.52V175.86L238.39 171.19Z" fill="#ECCCA2" />
          <path d="M64.8499 171.19L77.6599 175.86V166.52L64.8499 171.19Z" fill="#ECCCA2" />
          <path d="M227.01 170.19H73.3899V172.19H227.01V170.19Z" fill="#ECCCA2" />
        </g>
        <path d="M256.82 274.04V105.4L224.66 73.24H48.23V251.84L67.25 270.22" stroke="#050308" strokeMiterlimit="10" />
        <path d="M257 93.55L224.84 61.2V14.34L257 46.69V93.55Z" fill="#E8BE8B" stroke="#050308" strokeLinecap="round" strokeLinejoin="round" />
        <mask id="mask1_642_1648" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="48" y="14" width="177" height="48">
          <path d="M48.23 61.2L224.78 61.2V14.34L48.23 14.34V61.2Z" fill="white" />
        </mask>
        <g mask="url(#mask1_642_1648)">
          <path
            d="M166.27 138.55L171.23 145.99L176.51 153.91L182.14 162.36L188.16 171.39L194.61 181.06L201.54 191.45L209 202.63L217.05 214.71L225.77 227.79H261.35V14.34M47.8999 192.22V49.91M47.8999 14.33H261.36M47.8999 227.79V192.21L60.9599 183.49L73.0199 175.43L84.1899 167.97L94.5599 161.04L104.22 154.59L113.24 148.57L121.68 142.94L129.59 137.66L137.02 132.7V103.44L129.59 96.01M225.78 227.78H83.4699M248.27 214.7H60.9599V27.4M60.9599 27.4L47.8999 14.34V49.92L60.9599 58.63L73.0199 66.67L84.1899 74.11L94.5599 81.02L104.22 87.46L113.24 93.47L121.68 99.09L129.59 104.36L137.02 109.31M60.9599 27.4H248.27L236.19 39.46M60.9599 27.4L73.0199 39.46M236.19 202.63H73.0199V39.46M236.19 202.63V39.46M236.19 202.63L248.27 214.71M236.19 202.63L225.01 191.45M73.0199 39.46H209L217.05 27.4L225.77 14.34M73.0199 39.46L84.1899 50.63M225.01 191.45H84.1899V50.63M225.01 191.45V50.63M84.1899 50.63H225.01M84.1899 50.63L94.5599 61M214.62 181.06H94.5599V61M94.5599 61H214.62M261.34 14.33L248.26 27.39V58.61L236.18 66.65L225 74.09L214.61 81L204.94 87.44L195.91 93.45L187.46 99.07L179.54 104.34L172.1 109.29V132.69L179.54 137.65L187.46 142.93L195.91 148.56L204.94 154.58L214.61 161.03L225 167.96L236.18 175.42L248.26 183.48V214.7L261.34 227.78M236.19 39.46L225.01 50.63M204.95 171.39H104.22V70.66M261.35 49.91L248.27 58.62V183.49L261.35 192.21M83.4699 14.34L92.1799 27.4L100.22 39.46L107.66 50.63L114.57 61L121.01 70.66L127.02 79.68L132.64 88.11L137.91 96.02L142.86 103.45H166.26L171.22 96.02L176.5 88.11L182.13 79.68L188.15 70.66L194.6 61L201.53 50.63L208.99 39.46H236.18M225 50.63L214.61 61M214.61 61V181.06M214.61 61L204.94 70.66M214.61 181.06L225 191.45M214.61 181.06L204.94 171.39V70.66M190.19 227.79L185.82 214.71L181.79 202.63L178.06 191.45L174.59 181.06L171.36 171.39L168.35 162.36L165.53 153.91L162.89 145.99L160.41 138.55M119.03 227.79L123.38 214.71L127.4 202.63L131.12 191.45L134.57 181.06L137.79 171.39L140.79 162.36L143.6 153.91L146.23 145.99L148.7 138.55M195.91 162.36H113.22V79.67M137 126.85L129.57 129.33L121.66 131.97L113.22 134.79L104.2 137.8L94.5399 141.03L84.1699 144.5L72.9999 148.23L60.9399 152.26L47.8799 156.63M137 115.14L129.57 112.67L121.66 110.04L113.22 107.23L104.2 104.23L94.5399 101.02L84.1699 97.57L72.9999 93.85L60.9399 89.84L47.8799 85.49M204.94 70.66H104.21L94.5499 61M154.61 227.79V214.71L154.6 202.63V191.45L154.59 181.06V171.39L154.58 162.36V153.91V145.99V138.55M137.02 121H129.59H121.68H113.24L104.22 121.01H94.5599L84.1899 121.02H73.0199L60.9599 121.04H47.8999M204.96 70.65L195.93 79.67V162.36L204.96 171.39M104.23 70.66L113.25 79.68M113.25 79.68H195.94L187.49 88.11H121.69M113.25 79.68L121.69 88.11M121.69 88.11L129.6 96.02H179.58L187.5 88.11V153.91M187.5 153.91L195.95 162.36M187.5 153.91H121.7V88.11M179.59 145.99L172.15 138.55H142.9L137.95 145.99L132.68 153.91L127.06 162.36L121.05 171.39L114.61 181.06L107.7 191.45L100.26 202.63L92.2199 214.71L83.5099 227.79H47.9299M129.62 145.99L137.05 138.55V132.7M179.57 96.03V146.01M179.57 146.01L187.49 153.93M179.57 146.01H129.59L121.68 153.93L113.24 162.38L104.22 171.41L94.5599 181.08L84.1899 191.47L73.0199 202.65L60.9599 214.73L47.8999 227.81M129.59 96.04V146.02M261.35 156.66L248.27 152.29L236.19 148.26L225.01 144.53L214.62 141.06L204.95 137.83L195.92 134.82L187.47 132L179.55 129.36L172.11 126.88M261.34 85.52L248.26 89.87L236.18 93.88L225 97.6L214.61 101.05L204.94 104.26L195.91 107.26L187.46 110.07L179.54 112.7L172.1 115.17M160.4 103.47L162.88 96.04L165.52 88.13L168.34 79.7L171.35 70.68L174.58 61.02L178.05 50.65L181.78 39.48L185.81 27.42L190.18 14.36M148.7 103.47L146.23 96.04L143.6 88.13L140.79 79.7L137.79 70.68L134.57 61.02L131.12 50.65L127.4 39.48L123.38 27.42L119.03 14.36M261.33 121.09H248.25L236.17 121.07H224.99L214.6 121.06H204.93L195.9 121.05H187.45L179.53 121.04H172.09M154.54 103.48V96.05V88.14V79.71L154.55 70.69V61.03L154.56 50.66V39.49L154.57 27.43V14.37M172.08 103.48V109.33M136.97 103.48H142.82M166.22 103.48H172.07L179.51 96.05M172.07 132.73V138.58M142.82 138.58H136.97"
            stroke="#050308"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <path d="M256.99 288.4H77.8301V313.99H256.99V288.4Z" fill="#ECCCA2" stroke="#050308" strokeLinecap="round" strokeLinejoin="round" />
        <mask id="mask2_642_1648" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="77" y="288" width="180" height="26">
          <path d="M256.99 288.4H77.8301V313.99H256.99V288.4Z" fill="white" />
        </mask>
        <g mask="url(#mask2_642_1648)">
          <path
            d="M263.32 320.4H226.52L217.5 307.32L209.17 295.24L201.46 284.06L194.3 273.67L187.63 264L181.4 254.97L175.57 246.52L170.11 238.6L164.98 231.16M263.33 320.4V106.95H42.53M42.53 284.83V142.53M42.53 284.83V320.41M42.53 284.83L56.04 276.11L68.52 268.05L80.08 260.59L90.81 253.66L100.8 247.21L110.13 241.19L118.86 235.56L127.04 230.28L134.73 225.32V196.06L127.04 188.63M226.54 320.4H79.31M237.3 295.24H68.51V132.07M68.51 132.07L56.03 120.01V307.32H249.78L237.29 295.24M68.51 132.07H209.17L217.5 120.01L226.52 106.95M68.51 132.07L80.07 143.24H225.74M225.73 284.06H80.06V143.24L90.79 153.61M214.98 273.67H90.79V153.61M214.98 273.67V153.61M214.98 273.67L225.72 284.06M90.79 153.61H214.98M263.32 106.94L249.79 120V151.22L237.3 159.26L225.73 166.7L214.99 173.61L204.99 180.05L195.65 186.06L186.91 191.68L178.72 196.95L171.02 201.9V225.3L178.72 230.26L186.91 235.54L195.65 241.17L204.99 247.19L214.99 253.64L225.73 260.57L237.3 268.03L249.79 276.09V307.31L263.32 320.39M42.51 106.95L56.02 120.01H249.78L237.29 132.07M237.29 132.07V295.24M237.29 132.07L225.72 143.24M237.29 132.07H209.16L201.45 143.24L194.29 153.61L187.62 163.27L181.39 172.29L175.56 180.72L170.1 188.63L164.97 196.06H140.76L135.64 188.63L130.19 180.72L124.37 172.29L118.15 163.27L111.49 153.61L104.34 143.24L96.64 132.07L88.32 120.01L79.31 106.95M237.29 295.24L225.72 284.06M204.98 264H100.78V163.27M225.72 143.24V284.06M225.72 143.24L214.98 153.61M263.33 142.52L249.8 151.23V276.1L263.33 284.82M189.71 320.4L185.19 307.32L181.02 295.24L177.16 284.06L173.57 273.67L170.23 264L167.11 254.97L164.19 246.52L161.46 238.6L158.89 231.16M116.09 320.4L120.59 307.32L124.74 295.24L128.59 284.06L132.16 273.67L135.49 264L138.6 254.97L141.51 246.52L144.23 238.6L146.79 231.16M195.62 254.97H110.09V172.28M195.62 254.97V172.28L204.96 163.26M195.62 254.97L204.96 264M134.68 219.46L126.99 221.94L118.81 224.58L110.08 227.4L100.75 230.41L90.76 233.64L80.03 237.11L68.47 240.84L55.99 244.87L42.48 249.24M134.67 207.75L126.98 205.28L118.8 202.65L110.07 199.84L100.74 196.84L90.75 193.63L80.02 190.18L68.46 186.46L55.98 182.45L42.47 178.1M214.94 153.61L204.94 163.27M204.94 163.27V264L214.94 273.67M204.94 163.27H100.74L90.75 153.61M152.88 320.4V307.32L152.87 295.24V284.06L152.86 273.67V264L152.85 254.97V246.52V238.6V231.16M134.69 213.61H127H118.82H110.09L100.76 213.62H90.77L80.04 213.63H68.48L56 213.65H42.49M100.76 163.27L110.09 172.29M110.09 172.29H195.62M110.09 172.29L118.82 180.72M118.82 180.72H186.89M118.82 180.72L127 188.63H178.7M118.82 180.72V246.52H186.89M186.89 180.72L195.63 172.29M186.89 180.72L178.7 188.63M186.89 180.72V246.52M178.7 188.63V238.61M186.89 246.52L195.63 254.97M178.7 238.6L171 231.16H140.74L135.62 238.6L130.17 246.52L124.35 254.97L118.13 264L111.47 273.67L104.32 284.06L96.62 295.24L88.3 307.32L79.29 320.4H42.49M126.99 238.6L134.68 231.16V225.31M42.49 106.94V142.52L56 151.23L68.48 159.27L80.04 166.71L90.77 173.62L100.76 180.06L110.09 186.07L118.82 191.69L127 196.96L134.69 201.91M178.7 238.61L186.89 246.53M178.7 238.61H127L118.82 246.53L110.09 254.98L100.76 264.01L90.77 273.68L80.04 284.07L68.48 295.25L56 307.33L42.49 320.41M126.99 188.64V238.62M263.29 249.26L249.76 244.89L237.27 240.86L225.7 237.13L214.96 233.66L204.96 230.43L195.62 227.42L186.88 224.6L178.69 221.96L170.99 219.48M263.29 178.12L249.76 182.47L237.27 186.48L225.7 190.2L214.96 193.65L204.96 196.86L195.62 199.86L186.88 202.67L178.69 205.3L170.99 207.77M158.88 196.07L161.45 188.64L164.18 180.73L167.1 172.3L170.22 163.28L173.56 153.62L177.15 143.25L181.01 132.08L185.18 120.02L189.7 106.96M146.79 196.07L144.23 188.64L141.51 180.73L138.6 172.3L135.49 163.28L132.16 153.62L128.59 143.25L124.74 132.08L120.59 120.02L116.09 106.96M263.29 213.69H249.76L237.27 213.67H225.7L214.96 213.66H204.96L195.62 213.65H186.88L178.69 213.64H170.99M152.83 196.08V188.65V180.74V172.31L152.84 163.29V153.63L152.85 143.26V132.09L152.86 120.03V106.97M170.97 196.08V201.93M170.97 196.08H164.92M170.97 196.08L178.67 188.65M134.66 196.08H140.71M170.97 225.33V231.18M140.71 231.18H134.66"
            stroke="#050308"
            strokeWidth="0.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <g>
          {PATH_LIST[pathIndex] && (
            <motion.path
              key={pathIndex}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ ease: "linear", duration: 2 }}
              d={PATH_LIST[pathIndex]}
              stroke="#90F9EA"
              strokeWidth="4" // why not work
              style={{ strokeWidth: "4" }}
              stroke-dasharray="1000"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          )}
        </g>
        <defs>
          <linearGradient id="paint0_linear_642_1648" x1="35.56" y1="13.42" x2="-10.69" y2="55.28" gradientUnits="userSpaceOnUse">
            <stop offset="0.06" stopColor="#C49C70" />
            <stop offset="0.11" stopColor="#CBA478" />
            <stop offset="0.24" stopColor="#D9B68B" />
            <stop offset="0.39" stopColor="#E4C298" />
            <stop offset="0.59" stopColor="#EAC99F" />
            <stop offset="1" stopColor="#ECCCA2" />
          </linearGradient>
          <linearGradient id="paint1_linear_642_1648" x1="187.01" y1="355.79" x2="187.01" y2="327.11" gradientUnits="userSpaceOnUse">
            <stop offset="0.06" stopColor="#C49C70" />
            <stop offset="0.11" stopColor="#CBA478" />
            <stop offset="0.24" stopColor="#D9B68B" />
            <stop offset="0.39" stopColor="#E4C298" />
            <stop offset="0.59" stopColor="#EAC99F" />
            <stop offset="1" stopColor="#ECCCA2" />
          </linearGradient>
        </defs>
      </svg>
    </Box>
  )
}

export default NFTCard
