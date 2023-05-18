import {
  Box, Button, Divider, FormControl, IconButton,
  InputAdornment, OutlinedInput, Stack, Switch, TextField, Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SOMETHING_IS_WRONG } from '../../../../../../domain/constants/messages';
import { selectPersonalGoal, setPersonalGoal } from '../../../../../../app/redux/slices/assetSlice';

interface InputModalProps {
  setPersonalGoalModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

interface Form {
  name: string,
  money: number,
  deadline: string,
  type: '' | 'day' | 'month',
  autoSaving: boolean,
  popUp: boolean,
}

interface ChangePersonalGoal {
  (state: { target: { id: string, value: string | number | boolean } }): void,
}

function InputModal({
  setPersonalGoalModalOpen,
}: InputModalProps) {
  const [form, setForm] = useState<Form>({
    name: '',
    money: 0,
    deadline: '2024-01-01',
    type: 'day', // day||month
    autoSaving: true,
    popUp: false,
  });

  const changePersonalGoal: ChangePersonalGoal = (state) => {
    setForm({ ...form, [state.target.id]: state.target.value });
  };

  const divisionByType = (type: string, money: number): number | string => {
    switch (type) {
      case 'day':
        return Math.round(money / 365);
      case 'month':
        return Math.round(money / 12);
      default:
        return SOMETHING_IS_WRONG;
    }
  };

  const dispatch = useDispatch();
  const personal = useSelector(selectPersonalGoal);
  useEffect(() => {
    setForm(personal);
  }, [personal]);

  return (
    <Stack p={2} spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton
          onClick={() => setForm({
            name: '',
            money: 0,
            deadline: '2024-01-01',
            type: '', // day||month
            autoSaving: true,
            popUp: false,
          })}
          color="error"
        >
          <DeleteForeverIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Personal Goal
        </Typography>
        <IconButton onClick={() => setPersonalGoalModalOpen(false)}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Box my={1}>
        <Divider />
      </Box>

      <Stack spacing={1}>

        {/* 목표 */}
        <FormControl fullWidth>
          <OutlinedInput
            id="name"
            startAdornment={<InputAdornment position="start">목표</InputAdornment>}
            value={form.name}
            onChange={changePersonalGoal}
            size="small"
            inputProps={{
              style: { textAlign: 'right' },
            }}
          />
        </FormControl>

        {/* 금액 */}
        <FormControl fullWidth>
          <OutlinedInput
            id="money"
            startAdornment={<InputAdornment position="start">금액</InputAdornment>}
            value={form.money.toLocaleString('ko-KR')}
            onChange={(e) => changePersonalGoal({
              target: {
                id: e.target.id,
                value: +e.target.value.replaceAll(',', ''),
              },
            })}
            size="small"
            inputProps={{
              style: { textAlign: 'right' },
              step: 10,
            }}
            type="text"
            onFocus={(e) => e.target.select()}
          />
        </FormControl>

        {/* 기한 */}
        <TextField
          id="deadline"
          type="date"
          fullWidth
          /**
           * 다음 링크를 참고하면 InputProps / inputProps 두 가지의 속성을 지원하고 있는데
           * 대소문자를 고려했을 때 중복된 속성명임에도 불구하고 다른 기능을 지원하는 듯 함.
           * https://mui.com/material-ui/api/text-field/
           */
          InputProps={{
            startAdornment: <InputAdornment position="start">기한</InputAdornment>,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{
            style: { textAlign: 'right' },
          }}
          value={form.deadline}
          onChange={changePersonalGoal}
          size="small"
        />

        {/* 적금 단위 */}
        <Stack direction="row" spacing={1}>
          <Button
            fullWidth
            id="type"
            variant={form.type === 'day' ? 'contained' : 'outlined'}
            onClick={() => changePersonalGoal({
              target: {
                id: 'type',
                value: 'day',
              },
            })}
          >
            하루 기준
          </Button>
          <Button
            fullWidth
            id="type"
            variant={form.type === 'month' ? 'contained' : 'outlined'}
            onClick={() => changePersonalGoal({
              target: {
                id: 'type',
                value: 'month',
              },
            })}
          >
            한달 기준
          </Button>
        </Stack>

        {/* 필요 적금 액 */}
        <FormControl fullWidth>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">필요 적금액</InputAdornment>}
            value={divisionByType(form.type, form.money).toLocaleString('ko-KR')}
            size="small"
            inputProps={{
              style: { textAlign: 'right' },
            }}
          />
        </FormControl>

        {/* 자동 적금 */}
        <FormControl fullWidth>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">자동 적금</InputAdornment>}
            endAdornment={(
              <Switch
                checked={form.autoSaving}
                onChange={() => changePersonalGoal({
                  target: {
                    id: 'autoSaving',
                    value: !form.autoSaving,
                  },
                })}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            size="small"
            readOnly
          />
        </FormControl>

        {/* 팝업 */}
        <FormControl fullWidth>
          <OutlinedInput
            startAdornment={<InputAdornment position="start">팝업</InputAdornment>}
            endAdornment={(
              <Switch
                checked={form.popUp}
                onChange={() => changePersonalGoal({
                  target: {
                    id: 'popUp',
                    value: !form.popUp,
                  },
                })}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            )}
            size="small"
            readOnly
          />
        </FormControl>

      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          dispatch(setPersonalGoal(form));
          setPersonalGoalModalOpen(false);
        }}
      >
        나만의 목표 설정하기
      </Button>
    </Stack>
  );
}
export default InputModal;