import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Error from './ErrorMessage'
import Form from './styles/Form'

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
    ) {
        createUser(data: { email: $email, name: $name, password: $password }) {
            id
            email
            name
        }
    }
`

export default function SignUp() {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    })

    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    async function handleSubmit(e) {
        e.preventDefault()
        await signup().catch(console.error)
        resetForm()
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up For An Account</h2>
            <Error error={error} />
            <fieldset>
                {data?.createUser && (
                    <p>
                        Signed up with {data.createUser.email} - Please sign in
                    </p>
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
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        autoComplete="name"
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
                <button type="submit">Sign Up</button>
            </fieldset>
        </Form>
    )
}
