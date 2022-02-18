import React from 'react'
import Header from '../../Componets/Header/Header'
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Subscription from '../../Componets/Subscriptions/Subscription'

function SubscriptionPage() {
    return (
        <div>
            <Header/>
            <div className="app_page">
                <Sidebar Subscription={true}/>
                <Subscription/>
            </div>
        </div>
    )
}

export default SubscriptionPage
