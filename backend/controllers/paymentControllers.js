const catchAsyncErrors = require("../middelware/catchAsyncErrors");

const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await Stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        },
    });

    res.status(200).json({success:true, client_secret:myPayment.client_secret});

});

exports.sendStripeApikey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({stripeApikey:process.env.STRIPE_API_KEY });
});