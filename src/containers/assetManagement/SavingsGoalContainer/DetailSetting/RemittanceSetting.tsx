/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Stack, Box, Switch, FormControl, OutlinedInput, InputAdornment, Autocomplete, Select, MenuItem
} from '@mui/material';
import RoundedPaper from '../../../../components/common/RoundedPaper';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

interface RemittanceSettingProps {
  remittance: any,
  handleRemittance: (value: any) => void,
}

function RemittanceSetting({ remittance, handleRemittance }: RemittanceSettingProps) {
  const options = ['none', '매달 1일', '매달 15일', '매달 마지막날', '직접 설정'];
  const changeRemittance = (state: { target: { id: string; value: string | number; }; }) => {
    handleRemittance({
      ...remittance,
      settings: { ...remittance.settings, [state.target.id]: state.target.value },
    });
  };
  return (
    <RoundedPaper my={1}>
      <Stack direction="row" justifyContent="space-between">
        <Box>계좌 송금 설정</Box>
        <Switch
          size="small"
          sx={{ p: 0, borderRadius: 6 }}
          checked={remittance.isOn}
          onChange={() => handleRemittance({ ...remittance, isOn: !remittance.isOn })}
        />
      </Stack>

      {remittance.isOn
        && (
          <Stack spacing={1} mt={1}>
            {/* 은행명 */}
            <FormControl fullWidth>
              <OutlinedInput
                id="bankName"
                startAdornment={<InputAdornment position="start">은행명</InputAdornment>}
                value={remittance.settings.bankName}
                onChange={changeRemittance}
                size="small"
                inputProps={{
                  style: { textAlign: 'right' },
                }}
              />
            </FormControl>

            {/* 계좌번호 */}
            <FormControl fullWidth>
              <OutlinedInput
                id="accountNumber"
                startAdornment={<InputAdornment position="start">계좌번호</InputAdornment>}
                value={remittance.settings.accountNumber}
                onChange={changeRemittance}
                size="small"
                inputProps={{
                  style: { textAlign: 'right' },
                }}
              />
            </FormControl>

            {/* 송금일 */}
            <FormControl
              fullWidth
              size="small"
            >
              {/* <Autocomplete
                id="date"
                freeSolo
                disableClearable
                value={remittance.settings.date}
                options={options}
                onChange={(e, newValue) => changeRemittance({ target: { id: 'date', value: newValue }})}
                renderInput={(params) =>
                  <OutlinedInput
                    ref={params.InputProps.ref}
                    startAdornment={<InputAdornment position="start">송금일</InputAdornment>}
                    endAdornment={<InputAdornment position="end"><CalendarTodayOutlinedIcon /></InputAdornment>}
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: 'right' },
                    }}
                  />
                }
              /> */}
              <Select
                // IconComponent = {CalendarTodayOutlinedIcon}
                inputProps={{
                  IconComponent: () => null,
                  style: { textAlign: 'right' },
                }}
                startAdornment={<InputAdornment position="start">송금일</InputAdornment>}
                endAdornment={<InputAdornment position="end"><CalendarTodayOutlinedIcon /></InputAdornment>}
                sx={{ '.MuiSelect-select.MuiSelect-outlined': { textAlign: 'right', paddingX: 0 } }}
              >
                {options.map((option) => <MenuItem value={option}>{option}</MenuItem>)}
              </Select>
            </FormControl>

            {/* 송금액 */}
            <FormControl fullWidth>
              <OutlinedInput
                id="amount"
                startAdornment={<InputAdornment position="start">송금액</InputAdornment>}
                endAdornment={<InputAdornment position="end">원</InputAdornment>}
                value={remittance.settings.amount.toLocaleString('ko-KR')}
                onChange={(e) => changeRemittance({ target: { id: 'amount', value: +e.target.value.replaceAll(',', '') }})}
                onFocus={(e) => e.target.select()}
                size="small"
                inputProps={{
                  style: { textAlign: 'right' },
                }}
              />
            </FormControl>
          </Stack>
        )}
    </RoundedPaper>
  );
}

export default RemittanceSetting;