import RequestReset from '../components/RequestReset'
import Reset from '../components/Reset'

export default function ResetPage({ query }) {
    if (!query?.token) {
        return (
            <div>
                <p>Please supply a token</p>
                <RequestReset />
            </div>
        )
    }
    return (
        <div>
            <p>reset password</p>
            <Reset token={query.token} />
        </div>
    )
}
