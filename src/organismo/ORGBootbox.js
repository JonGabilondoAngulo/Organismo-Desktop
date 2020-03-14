module.exports =

    class ORGBootbox {

        static async progressDialog(message) {

            return new Promise((resolve, reject) => {
                bootbox.dialog({
                    message: '<div class="text-center"><h4><i class="fa fa-spin fa-spinner"></i>&nbsp;' + message + '</h4></div>',
                    closeButton: false,
                    onShown:  (e) => {
                        resolve();
                    }
                })
            })
        }

    }