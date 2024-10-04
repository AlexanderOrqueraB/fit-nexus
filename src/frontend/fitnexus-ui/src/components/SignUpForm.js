import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components_ui/ui/card';
import { Input } from '../components_ui/ui/input';
import { Label } from '../components_ui/ui/label';
import {
Select,
SelectContent,
SelectGroup,
SelectItem,
SelectLabel,
SelectTrigger,
SelectValue,
} from "../components_ui/ui/select"

export function SignUpForm() {
	useState({});
	const [data, setData] = useState({
		nombre: '',
		apellido: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const onSubmit = (e) => {
		e.preventDefault(); //prevent refresh on page
		const userData = {
			nombre: data.nombre,
			apellido: data.apellido,
			email: data.email,
			password: data.password,
			role: data.role,
		};

		if (userData.password !== data.confirmPassword) {
			throw new Error('Las contraseñas no coinciden...');
		}

		console.log('Datos de signup: ', userData);

		axios
			.post('http://localhost:8080/api/v1/signup', userData)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
					console.log('Mostrando Toast de Login Okay...');
					if (response.data.role === 'ADMIN') {
						console.log('Redireccionando a pagina admin');
					} else if (response.data.role === 'USER') {
						console.log('Redireccionando a pagina no admin');
					}
				}
			})
			.catch((error) => {
				console.error('Error en el proceso de registro: ', error);
			});
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Crear cuenta</CardTitle>
				<CardDescription>Introduce tu información para crear una cuenta</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="nombre">Nombre</Label>
							<Input
								id="nombre"
								name="nombre"
								type="text"
								value={data.nombre}
								onChange={handleChange}
								placeholder="Pepito"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="apellido">Apellido</Label>
							<Input
								id="apellido"
								name="apellido"
								type="text"
								value={data.apellido}
								onChange={handleChange}
								placeholder="Pepitez"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={data.email}
								onChange={handleChange}
								placeholder="pepito@pepitez.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={data.password}
								onChange={handleChange}
								placeholder="Introduce tu contraseña"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirma tu contraseña</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								value={data.confirmPassword}
								onChange={handleChange}
								placeholder="Confirma tu contraseña"
								required
							/>
						</div>
						<div className="grid gap-2">
								<Select>
									<SelectTrigger className="w-[280px]">
										<SelectValue placeholder="Select a timezone" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
										<SelectLabel>Tipo de usuario</SelectLabel>
											<SelectItem name="role" value="ADMIN" onValueChange= {handleChange} required>
												Entrenador
											</SelectItem>
											<SelectItem name="role" value="USER">Cliente</SelectItem>
										</SelectGroup>
									</SelectContent>
									</Select>
						</div>
						<Button onClick={onSubmit} type="submit" className="w-full">
							Crear una cuenta
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Tienes ya una cuenta?{' '}
						<Link to="http://localhost:3000/login" className="underline">
							Iniciar sesión 3000
						</Link>
						<Link to="http://localhost:8080/login" className="underline">
							Iniciar sesión 8080
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default SignUpForm;
