

const authorise = (permittedUser) => {

     return (req, res, next) => {
         const user = req.user
         let isPermitted = false;

         permittedUser.map((role) => {

            if(user.role.includes(role)) {
                isPermitted = true;
            }
         });

         if(isPermitted) {
             return next();
         }else{
             return res.status(403).send({message:"Not authorised"})
         }
     }
}


module.exports = authorise;