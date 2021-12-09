const boleto = require("../modelos/boleto");
const bd = require('mongoose')
const crearBoletos = (numMin, numMax) => {
    const boletos = [];
    for (let i = numMin; i <= numMax; i++) {
        const bol = new boleto({
            numero: i,
            comprobantePago: '',
            tipoPago: '',
            estadoBoleto: 'LIBRE',
        });
        bol.save((err) => {
            if (err) {
                throw new Error(err.message);
            } 
        });
        boletos.push(bol);
    }
    return boletos;
};

const getBoletos = (req, res) => {
    boleto.find((err, boletos) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener los boletos: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boletos,
            });
        }
    });
};

const getBoleto = (req, res) => {
    boleto.findById(req.params.id, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al obtener el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });
};

const eliminarBoleto = (req, res) => {
    boleto.findByIdAndDelete({ _id: req.params.id }, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al eliminar el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });
};

const actualizarBoleto = async (req) => {
    /*boleto.findByIdAndUpdate(req.params.id, req.body, (err, boleto) => {
        if (err) {
            res.status(400).json({
                status: 'error',
                message: `Error al actualizar el boleto: ${err}`,
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: boleto,
            });
        }
    });*/

    try{
        /*const dbName = 'Sorteos';
        const user = 'feel_joe';
        const password = 'StdP3875';
        const uri = `mongodb+srv://${user}:${password}@cluster0.uhfd5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        bd.connect(uri)
        .then(() => console.log('Connection successful'))
        .catch((err) => console.log(err));*/
        var myquery = { "_id": req.body._id };
        var newvalues =  req.body;
        console.log(myquery);
        console.log(newvalues);
        const res = await boleto.updateOne(myquery,newvalues);
        console.log("Un boleto ha sido actualizado");
        return res
    } catch(e){
        console.log("No funcionó :c" + e);
    } 


    /*try {
            var dbo = db.db("Sorteos");
            var myquery = { "_id": id };
            const res = await dbo.collection("rifa").deleteOne(myquery);
            console.log("Una rifa ha sido eliminada");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }*/
};

module.exports = {
    crearBoletos,
    getBoletos,
    getBoleto,
    eliminarBoleto,
    actualizarBoleto,

};



