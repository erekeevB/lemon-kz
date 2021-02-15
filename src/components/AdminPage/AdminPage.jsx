import { useQuery } from '@apollo/client'
import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GET_ITEMS_ADMIN } from '../../GRAPHQL/admin'

const AdminPage = ({profile, isInitialized, match}) => {

    const {} = useQuery(GET_ITEMS_ADMIN, {})

    return (
    <>
        {isInitialized?
        <div>
            <h2>Admin Page</h2>
            <div>
                
            </div>
        </div>
        :
        <div>Loading...</div>
        }
    </>
    )

}

const mStP = (state) => ({
    profile: state.auth.profile
})

export default connect(mStP, {})(AdminPage)