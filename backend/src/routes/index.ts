const { Router } = require("express");

const home = require("../controllers/index");
const product = require("../controllers/product");
const auth = require("../controllers/auth");
const cart = require("../controllers/cart");
const user = require("../controllers/user");
const stripe = require("../controllers/stripe");
const review = require("../controllers/review");
const { upload } = require("../config/multer");

const router = Router();

router.get("/", home);
router.get("/products", product.getProducts);
router.get("/product/:id", product.getProductById);
router.get("/category/:category", product.getProductByCategory);
router.post("/auth/signup", auth.signUp);
router.post("/auth/signin", auth.signIn);
router.get("/cart", cart.getCart);
router.post("/cart/add", cart.addToCart);
router.delete("/cart/remove/:product_id", cart.removeFromCart);
router.delete("/cart/clear", cart.clearCart);
router.get("/user", user.getUser);
router.post("/user/upload", upload.single("file"), user.uploadFile);
router.put("/user/update", user.updateUser);
router.post("/create-payment-intent", stripe.createPaymentIntent);
router.get("/reviews", review.getReviews);
router.get("/review/:id", review.getReviewById);
router.post("/reviews/create", review.createReview);

module.exports = router;
export {};
