import {
    Box, Paper, Stack,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';
import { useAppSelector } from '../../../../app/redux/hooks';
import { selectGuestMode } from '../../../../app/redux/slices/commonSlice';
import { fetchCreateAccount } from '../../../../app/api/API';
import OrganizationSelect from './OrganizationSelect';
import AccountInput from './AccountInput';

function MyData() {
    const businessType = ['BK', 'CD', 'ST', 'IS'];
    const guestMode = useAppSelector(selectGuestMode);
    const [step, setStep] = useState(0);
    const [value, setValue] = useState(0);
    const [selected, setSelected] = useState({name: '', value: ''});
    const [form, setForm] = useState({id: '', password: ''});

    const handleChangeType = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setSelected({name: '', value: ''});
    };

    const handleSelectOrganization = (org: {name: string, value: string}) => {
        setSelected(org);
    }

    const changeDetailInfo = (state: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [state.target.id]: state.target.value });
    };

    const changeStep = () => setStep(step + 1);

    const handleClickOk = async () => {
        // if (guestMode) {
        //     alert('게스트 모드입니다.')
        // } else {
        //     const result = await fetchCreateAccount([{
        //         businessType: businessType[value],
        //         organization: selected.value,
        //         ...form,
        //     }]);
        //     console.log(result);
        // }
        const result = await fetchCreateAccount([{
            businessType: businessType[value],
            organization: selected.value,
            // loginType: 1,
            ...form,
        }]);
        console.log(result);
    }

    const steps = [
        <Paper sx={{ padding: 2 }} onClick={changeStep}>
            <Stack direction="row" justifyContent="space-between">
                <Box>My 자산 연결하기</Box>
                <KeyboardArrowRightIcon />
            </Stack>
        </Paper>,
        <OrganizationSelect
            value={value}
            selected={selected}
            handleChangeType={handleChangeType}
            handleSelectOrganization={handleSelectOrganization}
            changeStep={changeStep}
        />,
        <AccountInput
            selected={selected}
            form={form}
            changeDetailInfo={changeDetailInfo}
            handleClickOk={handleClickOk}
        />,
    ];

    return (
        <Box m={2}>
            {steps[step]}
        </Box>
    );
}

export default MyData;