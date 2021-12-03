const User = require('../model/user');

module.exports = {
    createUser: async (req) => {
        let user = req.body
        const newUser = new User({
            nome: user.nome,
            cognome: user.cognome
        });
        try {
            const result = await newUser.save();
            console.log("Utente creato: ".concat(result.nome, " ", result.cognome));
            return result;
            
        } catch (err) {
            console.log(err);
            let error = {
                error: "Non sono riuscito a creare il utente"
            }
            return error 
        } 
    },

    getUser: async (req) => {
        let filter = req.body
        try {
            let filterName = Object.keys(filter)
            if (filterName !== undefined && filterName.length > 0) {
                const result = await User.find(filter);
                console.log(result)
                return result;
            } else {
                const result = await User.find();
                console.log(result)
                return result
            }
        } catch (err) {
            let error = {
                error: "Non sono riuscito a trovare l'utente"
            }
            return error 
        } 
    },

    updateUser: async (req) => {
        let user = req.body
        const editUser = {
            _id: user._id,
            nome: user.nome,
            cognome: user.cognome
        };
        try {
            let filter = {_id: user._id}
            const result = await User.findByIdAndUpdate(filter, editUser)
            if (result !== undefined) {
                console.log("Modificato utente con id: ".concat(user._id))
                return editUser
            }
            return result;
        } catch (err) {
            console.log(err);
            let error = {
                error: "Non sono riuscito ad aggiornare l'utente con ID " + editUser._id
            }
            return error   
        } 
    },

    deleteUser: async (req) =>{
        let user = req.body
        try {
          await User.deleteOne({ _id: user._id });
          console.log("Eliminato utente con id: ".concat(user._id))
          return user._Id;
        } catch (err) {
            let error = {
                error: "Non sono riuscito a cancellare l'utente con ID " + user._id
            }
            console.log(err)
            return error 
        } 
    }
}