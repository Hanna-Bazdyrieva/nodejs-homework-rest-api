const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

async function register(req, res) {
	const { email, password } = req.body;
	const userExist = await User.findOne({ email });

	if (userExist) {
		throw HttpError(409, "Email is already in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);

	const newUser = await User.create({ ...req.body, password: hashPassword });

	res.status(201).json({
		user: {
			email: newUser.email,
			subscription: newUser.subscription,
		},
	});
}

async function login(req, res) {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}
	const passwordCompare = bcrypt.compare(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}
	const payload = {
		id: user._id,
	};
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token})

	res.status(200).json({
		token,
		user: {
			email: user.email,
			subscription: user.subscription,
		},
	});
}

async function getCurrent(req, res) {
  const{email, subscription = "starter"} = req.user
  res.status(200).json({email, subscription })
}

async function logout (req, res){
const {_id} = req.user
await User.findByIdAndUpdate(_id, {token:""})

res.status(204).json({message:'No content'})
}

async function changeSubscription (req, res){
  const {_id} = req.body
  const updatedUser = await User.findByIdAndUpdate({_id}, req.body, {new: true})

	if (!updatedUser) {
		throw HttpError(404, "Not found");
	}
	return res.status(200).json(updatedUser);
}

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
};
