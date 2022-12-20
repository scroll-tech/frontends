import { darken } from "polished"
import { useCallback, useContext, useState } from "react"
import styled, { ThemeContext } from "styled-components"
import { Currency, Pair } from "uniswap-v2-sdk-scroll"
import { useWeb3Context } from "@/contexts/Web3ContextProvider"
import { ReactComponent as DropDown } from "../../assets/images/dropdown.svg"
import { useCurrencyBalance } from "../../state/wallet/hooks"
import { TYPE } from "../../theme"
import CurrencyLogo from "../CurrencyLogo"
import DoubleCurrencyLogo from "../DoubleLogo"
import { Input as NumericalInput } from "../NumericalInput"
import { RowBetween } from "../Row"
import CurrencySearchModal from "../SearchModal/CurrencySearchModal"

import { useTranslation } from "react-i18next"

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? "1.2rem 0.8rem 1.2rem 1.6rem" : "1.2rem 1.2rem 1.2rem 1.6rem")};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 3.52rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? "none" : "0px 6px 10px rgba(0, 0, 0, 0.075)")};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.8rem;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 1.2rem;
  line-height: 1.6rem;
  padding: 1.2rem 1.6rem 0 1.6rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.4rem 0 0.8rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? "8px" : "20px")};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? "8px" : "20px")};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? "  margin: 0 0.4rem 0 1.2rem;" : "  margin: 0 0.4rem 0 0.4rem;")}
  font-size:  ${({ active }) => (active ? "20px" : "16px")};

`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.4rem;
  font-size: 1.4rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.8rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.8rem;
  `};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = "Input",
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { walletCurrentAddress } = useWeb3Context()

  const selectedCurrencyBalance = useCurrencyBalance(walletCurrentAddress ?? undefined, currency ?? undefined)
  const theme = useContext(ThemeContext)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
              {walletCurrentAddress && (
                <TYPE.body onClick={onMax} color={theme.text2} fontWeight={500} fontSize={14} style={{ display: "inline", cursor: "pointer" }}>
                  {!hideBalance && !!currency && selectedCurrencyBalance ? "Balance: " + selectedCurrencyBalance?.toSignificant(6) : " -"}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: "0", borderRadius: "8px" } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
              {walletCurrentAddress && currency && showMaxButton && label !== "To" && <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={"24px"} />
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : currency?.symbol) || t("selectToken")}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
