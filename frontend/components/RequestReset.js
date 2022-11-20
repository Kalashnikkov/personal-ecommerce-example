import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Error from './ErrorMessage'
import Form from './styles/Form'

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`

export default function RequestReset() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    })

    const [resetRequest, { data, loading, error }] = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: inputs,
            // refetchQueries: [{ query: CURRENT_USER_QUERY }],
        }
    )

    async function handleSubmit(e) {
        e.preventDefault()
        await resetRequest().catch(console.error)
        resetForm()
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <Error error={error} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && (
                    <p>Success! Check your email for a link</p>
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
                <button type="submit">Reset Password</button>
            </fieldset>
        </Form>
    )
}
