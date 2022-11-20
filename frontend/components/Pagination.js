import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Head from 'next/head'
import Link from 'next/link'
import { perPage } from '../config'
import DisplayError from './ErrorMessage'
import PaginationStyles from './styles/PaginationStyles'

export const PAGINATION_QUERY = gql`
    query {
        _allProductsMeta {
            count
        }
    }
`

export default function Pagination({ page }) {
    const { data, loading, error } = useQuery(PAGINATION_QUERY)
    if (loading) return 'Loading...'
    if (error) return <DisplayError error={error} />
    const { count } = data._allProductsMeta
    const pageCount = Math.ceil(count / perPage)
    return (
        <PaginationStyles>
            <Head>
                <title>Kalash Shop - Page {page} of ?</title>
            </Head>
            <Link href={`/products/${page - 1}`}>
                <a aria-disabled={page <= 1}>Previous</a>
            </Link>
            <p>
                Page {page} of {pageCount}
            </p>
            <p>{count} Items Total</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>Next</a>
            </Link>
        </PaginationStyles>
    )
}
