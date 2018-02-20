/*
customer listing api
*/

exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        if (err) console.log(err + "error");
        connection.query("select * from customer", function (err, result) {
            console.log(result);
            res.json({
                status: 200,
                data: result
            });
        });

    });
};

exports.save = function (req, res) {
    var input = req.body;
    var data = {

        name: input.name,
        address: input.address,
        email: input.email,
        phone: input.phone

    };

    req.getConnection(function (err, connection) {
        connection.query("insert into customer set ? ", data, function (err, result) {
            console.log(err)
            if (typeof result != "undefined" && result.affectedRows == 1)
                res.json({
                    status: 200,
                    data: result
                });
            else
                res.json({
                    status: 403,
                    data: err
                });
        });

    });

};

exports.delete = function (req, res) {
    var idtodelete = req.params.id;
    req.getConnection(function (err, connection) {
            connection.query("delete from customer where id="+idtodelete, function (err, result) {
                if (typeof result != "undefined" && result.affectedRows == 1)
                    res.json({
                        status: 200,
                        data: result
                    });
                else
                    res.json({
                        status: 403,
                        data: err
                    });
            });
        
    });
};


exports.editcustomer = function (req, res) {
    var idtoedit = req.params.id;
    console.log(idtoedit);
    req.getConnection(function (err, connection) {
            connection.query("select * from customer where id="+idtoedit, function (err, result) {
                if (typeof result != "undefined")
                    res.json({
                        status: 200,
                        data: result
                    });
                else
                    res.json({
                        status: 403,
                        data: err
                    });
            });
        
    });
};