import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { Button } from '../../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components_ui/ui/card';
import { Input } from '../../../components_ui/ui/input';
import { Label } from '../../../components_ui/ui/label';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from "../../../components_ui/ui/select"
import {apiClient} from "../../utils/client";
import { customToast } from '../../utils/customToast'
import { mockClients } from '../../../mocks/mockData'

export function SignUpForm() {
	const navigate = useNavigate();

	useState({});
	
	const [data, setData] = useState({
		nombre: '',
		apellido: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
		fitNexusId: '',
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
			...(data.role === "USER" && data.fitNexusId && {
				entrenador: { fitNexusId: data.fitNexusId },
			}),
		};

		if (userData.password !== data.confirmPassword) {
			customToast({message : "Las contraseñas no coinciden!", type : "warning"});
		}

		console.log('Datos de registro: ', userData);

		apiClient
			.post('/api/v1/signup', userData)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
					customToast({message : "Registro realizado correctamente!", type : "success"});
					navigate('/');
				}
			})
			.catch((error) => {
				customToast({message : "Error en el registro!", type : "error"});
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
								placeholder={mockClients[0].nombre}
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
								placeholder={mockClients[0].apellido}
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
								placeholder={mockClients[0].email}
								required
							/>
						</div>
						<div className="grid gap-2">
            			<Label htmlFor="role">Tipo de usuario</Label>
							<Select name="role" 
							onValueChange={(value) => setData({ ...data, role: value, fitNexusId: '' })}>
								<SelectTrigger>
									<SelectValue placeholder="Entrenador" />
								</SelectTrigger>
								<SelectContent>
										<SelectItem  value="ADMIN" required>
											Entrenador
										</SelectItem>
										<SelectItem  value="USER" required>
											Cliente
										</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{data.role === "USER" && (
							<div className="grid col-span-2 gap-2">
							<Label htmlFor="fitNexusId">Entrenador FitNexusId</Label>
							<Input
								id="fitNexusId"
								name="fitNexusId"
								type="text"
								value={data.fitNexusId}
								onChange={handleChange}
								placeholder="Introduce el código de tu entrenador"
								required
							/>
						</div>
						)}
						<div className="grid gap-2">
							<Label htmlFor="password">Contraseña</Label>
							<Input
								id="password"
								name="password"
								type="password"
								value={data.password}
								onChange={handleChange}
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
								required
							/>
						</div>
						<Button onClick={onSubmit} type="submit" className="w-full">
							Crear una cuenta
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						¿Tienes ya una cuenta?{' '}
						<Button onClick={()=> navigate("/")} >
							Ir a inicio de sesión 
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default SignUpForm;
