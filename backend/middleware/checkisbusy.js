const checkisbusy = (req, res, next) => {
    if (isBusy) return res.status(400).json({ message: "sorry the server is busy initialising daily reports" });
    next();
};
