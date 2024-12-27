import Profile from '../models/Profile.js';

export const getProfile = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile)
        return res.sendStatus(404);

    res.status(200).json(profile);
};

export const updateProfile = async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile)
        return res.sendStatus(404);

    const {  } = req.body;
    // name && profile.name = name;

    await profile.save();
    res.status(200).json(profile);
}