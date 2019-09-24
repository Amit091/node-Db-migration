exports.up = function(db, callback) {
    db.addColumn('user', 'firstname', {
        type: 'string',
        length: 50
    }, function(err) {
        if (err) return callback(err);

        db.addColumn('user', 'lastname', {
            type: 'string',
            length: 50
        }, function(err) {
            if (err) return callback(err);
            db.removeColumn('user', 'full_name', callback);
        });
    });
};
exports.down = function(db, callback) {
    db.addColumn('user', 'full_name', {
        type: 'string',
        length: 50
    }, function(err) {
        if (err) return callback(err);

        db.removeColumn('user', 'lastname', function(err) {
            if (err) return callback(err);
            db.removeColumn('user', 'firstname', callback)
        });
    });
};