import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
 key_id: "rzp_test_cUQuJBNCO1AMLQ",
 key_secret: "20w6RdGNNZU2XQuP9oQlW7eI",
});

export async function POST(request) {
    try{
        const { amount, currency ,receipt} = (await request.json());
        console.log(amount,currency,receipt);
        var options = {
            amount: amount,
            currency: currency,
            receipt: receipt,
        };
        const order = await razorpay.orders.create(options);
        console.log("order created",order);
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}