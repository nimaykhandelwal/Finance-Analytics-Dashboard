import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
    useToast
} from '@chakra-ui/react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const toast = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            navigate('/')
        } catch (err: any) {
            toast({
                title: 'Login failed',
                description: err.response?.data?.msg || err.message,
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }
    }

    return (
        <Box maxW="md" mx="auto" mt={12} p={6} boxShadow="md" borderRadius="md">
            <Heading mb={6} textAlign="center">Login</Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full">
                        Sign In
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}