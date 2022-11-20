import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Error from './ErrorMessage'
import Form from './styles/Form'

const RESET_MUTATION = gql`
    mutation RESET_MUTATION(
        $email: String!
        $token: String!
        $password: String!
    ) {
        redeemUserPasswordResetToken(
            email: $email
            token: $token
            password: $password
        ) {
            code
            message
        }
    }
`

export default function Reset({ token }) {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        token,
    })

    const [resetPassword, { data, loading, error }] = useMutation(
        RESET_MUTATION,
        {
            variables: inputs,
        }
    )

    const successfulError = data?.redeemUserPasswordResetToken.code
        ? data?.redeemUserPasswordResetToken.code
        : undefined

    async function handleSubmit(e) {
        e.preventDefault()
        await resetPassword().catch(console.error)
        resetForm()
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <Error error={error || successfulError} />
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && (
                    <p>Success! Password Reset</p>
                )}
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={inputs.email}
                        autoComplete="email"
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={inputs.password}
                        autoComplete="password"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Reset Password</button>
            </fieldset>
        </Form>
    )
}
