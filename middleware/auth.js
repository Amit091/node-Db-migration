module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash('success_msg', `Welcome ${req.user.name},You are already logged In`);
        console.log(`from auth middleware ${req.user}`);
        res.redirect('/dashboard');

    }
};