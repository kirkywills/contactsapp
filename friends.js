friends = {


    getFriend: function(callback){
        $.ajax({
            type: 'GET',
            url: 'http://rest.learncode.academy/api/learncode/johnbob',
            success: function(data) {

                if (typeof callback == 'function') {
                    callback(data);
                } 
               //console.log(data)
            },
            error: function(){
                alert('Something went wrong');
            }
          });
    },

    postFriend: function(firstName, lastName, title, company, phone, email, imageNumber, callback){
   
        $.ajax({

            type: 'POST',
            url: 'http://rest.learncode.academy/api/learncode/johnbob',
            data: {
                    firstname: firstName, 
                    lastname: lastName,
                    title: title,
                    company:company,
                    phone: phone,
                    email: email,
                    imageNumber: imageNumber
                },
            success: function(data) {
                
                if (typeof callback == 'function') {
                    callback(data);
                } 
                //console.log('Friend Posted Successfully!');
            },
            error: function(){
                alert('Something went wrong');a
            }
          });
    },

    editFriends: function(data){
        $.ajax({
            type: 'PUT',
            data: data,
            url: 'http://rest.learncode.academy/api/learncode/johnbob/'+ data.id,
            success: function() {},
            error: function(){
                alert('Something went wrong');
            }
          });
    },


    deleteFriend: function(id){
        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/learncode/johnbob/'+ id,
            success: function() {},
            error: function(){
                alert('Something went wrong');
            }
          });
    }
}

