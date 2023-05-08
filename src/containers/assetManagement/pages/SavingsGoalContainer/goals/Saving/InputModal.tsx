import {
  Box, Button, Divider, IconButton, Stack, TextField, Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectSavingGoal, setSavingGoal } from '../../../../../../domain/redux/asset/assetSlice';

interface InputModalProps {
  closeSavingGoalModal: () => void,
}
function InputModal({
  closeSavingGoalModal,
}: InputModalProps) {
  const [form, setForm] = useState({
    year: 0,
    month: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;
    const newValue = parseInt(value.replaceAll(',', ''), 10);
    if (newValue >= 0) {
      setForm({
        year: id === 'year' ? newValue : newValue * 12,
        month: id === 'year' ? Math.round(newValue / 12) : newValue,
      });
    } else {
      alert('숫자는 0 이하일 수 없습니다.');
    }
  };

  /**
 * redux에 이미 저장된 목표 값 불러오기
 */
  const dispatch = useDispatch();
  const saving = useSelector(selectSavingGoal);
  useEffect(() => {
    setForm(saving);
  }, [saving]);

  return (
    <Stack p={2} spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton
          onClick={() => setForm({
            year: 0,
            month: 0,
          })}
          color="error"
        >
          <DeleteForeverIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>저축 목표 설정</Typography>
        <IconButton onClick={() => closeSavingGoalModal()}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Box my={1}>
        <Divider />
      </Box>
      <Stack spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>1 Year Goal</Typography>
        <TextField
          fullWidth
          placeholder="한해동안의 저축 목표액을 입력하세요"
          type="text"
          value={form.year.toLocaleString('ko-KR')}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          id="year"
        />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>1 Month Goal</Typography>
        <TextField
          fullWidth
          placeholder="한해 저축 목표액을 입력하면 한달 저축 목표금액이 표시됩니다. "
          type="text"
          value={form.month.toLocaleString('ko-KR')}
          onFocus={(e) => e.target.select()}
          onChange={handleChange}
          id="month"
        />
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          dispatch(setSavingGoal(form));
          closeSavingGoalModal();
        }}
      >
        한해 저축 목표 설정하기
      </Button>
    </Stack>
  );
}

export default InputModal;
