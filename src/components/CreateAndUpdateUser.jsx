import React from 'react';

import { Formik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";



const CreateAndUpdateUser = () => {
    let navigate = useNavigate();

    let { addUser, changeUser } = userStore;

    let validation = yup.object().shape({
        name: yup.string().required('Обязательно'),
        email: yup.string().email('Введите корректный E-mail').required('Обязательно'),
        phone: yup.number().typeError('Должно быть числом').required('Обязательно'),
        age: yup.number().typeError('Должно быть числом').required('Обязательно'),
        gender: yup.string().required('Обязательно')
    })

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 5, width: '500px' },
                }}
                noValidate
                autoComplete="off"
            >
                <Formik
                    initialValues={{
                        name: "",
                        email:"",
                        phone: "",
                        age: "",
                        gender: ""
                    }}
                    validateOnBlur
                    onSubmit={values => {addUser(values); navigate("/userslistpage")}}
                    validationSchema={validation}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) =>
                        (<div className={"add-user-form"}>
                                <TextField id="name"
                                           label="Имя"
                                           variant="outlined"
                                           type={"text"}
                                           name={"name"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.name}
                                           error={touched.name && errors.name && true}
                                           helperText={ touched.name && errors.name}
                                />
                                <TextField id="email"
                                           label="E-mail"
                                           variant="outlined"
                                           type={"text"}
                                           name={"email"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.email}
                                           error={touched.email && errors.email && true}
                                           helperText={ touched.email && errors.email}
                                />
                                <TextField id="phone"
                                           label="Телефон"
                                           variant="outlined"
                                           type={"number"}
                                           name={"phone"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.phone}
                                           error={touched.phone && errors.phone && true}
                                           helperText={ touched.phone && errors.phone}
                                />
                                <TextField id="age"
                                           label="Возраст"
                                           variant="outlined"
                                           type={"number"}
                                           name={"age"}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                           value={values.age}
                                           error={touched.age && errors.age && true}
                                           helperText={ touched.age && errors.age}
                                />

                                <FormControl>
                                    <FormLabel id="gender">Пол</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="gender"
                                        defaultValue="1"
                                        value={values.gender}
                                        name="gender"
                                        row
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Женщина"/>
                                        <FormControlLabel value="1" control={<Radio />} label="Мужчина" />
                                    </RadioGroup>
                                </FormControl>
                                <Button variant="contained"
                                        disabled={!isValid && !dirty}
                                        onClick={handleSubmit}
                                        type={"submit"}
                                >Добавить</Button>

                            </div>
                        )}
                </Formik>
            </Box>
        </div>
    );
};

export default CreateAndUpdateUser;