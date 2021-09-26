import { stripe } from './../../../services/stripe';
import { query as q } from 'faunadb';
import { fauna } from "../../../services/fauna";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
) {
    //Buscar o usuário no banco do Fauna com o ID customerID
    //salvar os dados da subscription no Fauna DB

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    // dados de todas as subscriptions
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data: subscriptionData }
        )
    )


}