var toast = document.querySelector("#toast");
var rp = document.querySelector("request-page");

Polymer("request-page",{
    ready: function(){
        var context = this.$;
        context.candidates.style.display = "none";
        context.unHelpButton.style.display = "none";
        context.helpButton.style.display = "none";

        (window.onresize = function(){
            var clientWidth = context.content.clientWidth;
            var cardWidth = 404;
            var margin = clientWidth > cardWidth ? (clientWidth % cardWidth) / 2 : 2;
            context["float-left"].style.marginLeft = margin.toFixed() + "px";
        })();

        context.chat_collapse_button.addEventListener('click', function(){ context.chat_collapse.toggle(); });
    },
    userChanged:function(old,user) {
        var context = this.$;
        var request_id = this._id;
        if($.jStorage.get("user") != null){
            var usr = $.jStorage.get("user");
            delete usr.authKey;
            if(inArray(rp.helpers,usr))
                return;

            if(rp.user._id == $.jStorage.get("user")._id) {
                context.candidates.style.display = "block";
                if(rp.helpers.length > 0)
                    context.acceptAllHelpersButton.style.display = "inline-block";
                else
                    context.acceptAllHelpersButton.style.display = "none";
            } else if(!inArray(rp.candidates,usr)) {
                context.helpButton.style.display = "block";
            } else {
                context.unHelpButton.style.display = "block";
            }

            context.helpButton.addEventListener('click', function(){
                //TODO change button state and reload request elements
                rpc.call('requests.addCandidate', $.jStorage.get("user"),request_id, function (resp){
                    if(resp.error){
                        toast.text= resp.error.message;
                        toast.show();
                        return;
                    }
                    toast.text= "Помощь принята!";
                    toast.show();
                    context.helpButton.style.display = "none";
                    context.unHelpButton.style.display = "block";
                });
            });

            context.unHelpButton.addEventListener('click', function () {
                rpc.call('requests.removeCandidate', $.jStorage.get("user"), request_id, function (resp) {
                    if (resp.error) {
                        toast.text = resp.error.message;
                        toast.show();
                    } else {
                        toast.text = "Отказ Принят!";
                        toast.show();
                        context.helpButton.style.display = "block";
                        context.unHelpButton.style.display = "none";
                    }
                });
            });

            context.acceptAllHelpersButton.addEventListener('click', function(){
                acceptAllHelpers(context);
            });
        }else{
            context.helpButton.style.display = "none";
        }
    },
    helpersChanged:function(old,helpers){
        if(rp.user._id == $.jStorage.get("user")._id) {
            var context = this.$;
            if (helpers.length > 0)
                context.acceptAllHelpersButton.style.display = "inline-block";
            else
                context.acceptAllHelpersButton.style.display = "none";
        }
    },
    currentUser: $.jStorage.get("user")
});

function acceptCandidate(candidate_id){

    for(el in rp.candidates)
        if(rp.candidates[el]._id==candidate_id)
            var candidate = rp.candidates[el];
    rpc.call('requests.acceptCandidate', rp._id, candidate,  function (resp) {
        if (resp.error) {
            toast.text = resp.error.message;
            toast.show();
            return;
        }
        toast.text = "Кандидат принят";
        toast.show();
        rp.candidates = resp.result.candidates;
        rp.helpers  = resp.result.helpers;

    });
}
function cancelHelper(helper_id){
    for(el in rp.helpers)
        if(rp.helpers[el]._id==helper_id)
            var candidate = rp.helpers[el];
    rpc.call('requests.cancelHelper', rp._id, candidate,  function (resp) {
        if (resp.error) {
            toast.text = resp.error.message.err;
            toast.show();
            return;
        }
        toast.text = "Помошник откланен";
        toast.show();
        rp.candidates = resp.result.candidates;
        rp.helpers  = resp.result.helpers;

    });
}

function acceptAllHelpers(context){
    rpc.call('requests.acceptAllHelpers', rp._id, rp.helpers,  function (resp) {
        if (resp.error) {
            toast.text = "error: "+ resp.error.message;
            console.log(resp.error.message);
            toast.show();
            return;
        }
        toast.text = "Ура";
        toast.show();
        rp.helps = resp.result.helps;
        rp.helpers  = [];
        context.acceptAllHelpersButton.style.display = "none";
    });
}
function inArray(arr,b){
    for(var el in arr){
        if(JSON.stringify(arr[el]) === JSON.stringify(b)) return true;
    }
    return false;
}