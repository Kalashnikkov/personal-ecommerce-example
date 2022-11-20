import { ApolloProvider } from '@apollo/client'
import Router from 'next/router'
import nProgress from 'nprogress'
import PropTypes from 'prop-types'
import Page from '../components/Page'
import '../components/styles/nprogress.css'
import { CartStateProvider } from '../lib/cartState'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

function MyApp({ Component, pageProps, apollo }) {
    return (
        <ApolloProvider client={apollo}>
            <CartStateProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </CartStateProvider>
        </ApolloProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.any,
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
}

export default withData(MyApp)
