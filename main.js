
contacts = {

    heighestImage: 12,

    init: function(){

        
            // Trigger GET request
        friends.getFriend(function(data){
            
            data.forEach(function(data, i){
                contacts.heighestImage = data.imageNumber > contacts.heighestImage ? data.imageNumber : contacts.heighestImage;
                var html = contacts.paintUi(data, i);
                $('#contactDiv').append(html);
            });
 

        });

            // Options Button-Bookmark
        $('#contactDiv').on('click', '.optionsbtn', function(){
            $(this).closest('.card')
            .find('.options')
            .toggle(175);
        });
        
            // Get Phone
        $('#contactDiv').on('click', '.call', function(){
           var phoneNumber = $(this).closest('.card').find('.phone').text();
            $(this).attr('href', 'tel:+1'+ phoneNumber);
        });

            // Post contact
        $('#addContact').on('click',function(e){
            e.preventDefault();
            
            contacts.getFormValues();

            if(f.firstName === '' || f.lastName === '' || f.title === '' || f.company === '' || f.phone ==='' || f.email === '' ){
                
                $('#form').addClass('was-validated');
                contacts.showMessage('Please fill in all fields'); 
                return false;
            }
            else{  
                contacts.heighestImage = parseInt(contacts.heighestImage) + 1;
                contacts.heighestImage  = contacts.heighestImage > 44 ? 10 : contacts.heighestImage;

                friends.postFriend(f.firstName, f.lastName, f.title, f.company, f.phone, f.email, contacts.heighestImage, function(data){
                   
                    var html = contacts.paintUi(data)
                    contacts.showMessage('Contact added');   
                    $('#contactDiv').append(html);
                    contacts.clearFields();

                    // location.reload()
                    
                });
            }      
           
        });

            // Delete Contact
        $('#contactDiv').on('click', '.deletebtn', function(e){
            e.preventDefault();
            var card =  $(this).closest(".card");
            var id = card.attr('data-id');

            friends.deleteFriend(id);
            contacts.contactCount -= 1;
            card.fadeOut(1000, function(){
                contacts.showMessage('Contact has been Delete');
                card.remove();
                contacts.clearFields();
            });
        });

            // Edit Contact
        $('#contactDiv').on('click', '.editbtn', function(e){
            e.preventDefault();

            var card = $(this).closest('.card');

            var firstname = card.find('.fn').text();
            var lastname = card.find('.ln').text();
            var title = card.find('.title').text();
            var company = card.find('.company').text();
            var phone = card.find('.phone').text();
            var email = card.find('.email').text();

            $('input.edited-fn').val(firstname);
            $('input.edited-ln').val(lastname);
            $('input.edited-title').val(title);
            $('input.edited-company').val(company);
            $('input.edited-phone').val(phone);
            $('input.edited-email').val(email);
           
            card.find('.noedit').hide();
            card.find('.edit').show();
            
        });

            // Save Changes
        $('#contactDiv').on('click', '.savebtn', function(e){
            var card = $(this).closest('.card');

            var s = {

                firstname :card.find('input.edited-fn').val(),
                lastname :card.find('input.edited-ln').val(),
                title :card.find('input.edited-title').val(),
                company :card.find('input.edited-company').val(),
                phone :card.find('input.edited-phone').val(),
                email :card.find('input.edited-email').val(),
                id :card.attr('data-id')
            }

            card.find('.edit').hide();
            card.find('.noedit').show();

         

            friends.editFriends(s);
            var card = $(this).closest('.card');

            card.find('.fn').text(s.firstname);
            card.find('.ln').text(s.lastname);
            card.find('.title').text(s.title);
            card.find('.company').text(s.company);
            card.find('.phone').text(s.phone);
            card.find('.email').text(s.email);
            contacts.showMessage('Saved!!');
         });

            // Cancel Changes
         $('#contactDiv').on('click', '.cancelbtn', function(e){
            e.preventDefault();
            var card = $(this).closest('.card');

            card.find('.noedit').show();
            card.find('.edit').hide();
            card.find('input').val('');
            
         });

    },

    getFormValues: function(){

         f = {

            firstName : $('#first_name').val(),
            lastName : $('#last_name').val(),
            title : $('#title').val(),
            company : $('#company').val(),
            phone : $('#phone').val(),
            email : $('#email').val()
        }

        return f;
        
    },
    
    
    paintUi: function(data){

        // var i = contacts.heighestImage += 1;

        var html = `<div class="col-md-auto ">
        <div class="card" data-id="${data.id}">
            <div class="row options">
                <a class="editbtn">Edit</a>
                <a class="deletebtn">Delete</a>
                <a class= savebtn>Save</a>
                <a class="cancelbtn">Cancel</a>
            </div>
            <img  src="https://www.organicheadshots.com/images/headshot${data.imageNumber}-thumb.jpg"  style="width:100%">
            <a class="optionsbtn"><i class="fa fa-bookmark "></i></a>
            <form class="edit-div edit">
                <div class="form-row name" >
                    <div class="form-group col-md-6">
                        <label>First Name</label> 
                        <input type="text" class="form-control edited-fn" >
                    </div>
                    <div class="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" class="form-control edited-ln">
                        </div>
                </div>
                
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control edited-title">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" class="form-control edited-company">
                </div>
                <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Phone</label>
                    <input type="text" class="form-control edited-phone">
                </div>
                <div class="form-group col-md-6">
                    <label>Email</label>
                    <input type="text" class="form-control edited-email">
                </div>
                </div>
            </form>
            <div class="noedit">
                <h3><span class="fn">${data.firstname}</span>&nbsp;<span class="ln">${data.lastname}</span></h3>
                <p class="title">${data.title}</p>
                <p class="company">${data.company}</p>
                <p><span class="phone">${data.phone}</span><br><span class="email">${data.email}</span></p>
            </div>
            <div  class="social" style="margin: 4px 0;">
                <a href="#"><i class="fa fa-dribbble"></i></a> 
                <a href="#"><i class="fa fa-twitter"></i></a>  
                <a href="#"><i class="fa fa-linkedin"></i></a>  
                <a href="#"><i class="fa fa-facebook"></i></a> 
            </div>
            <p class="contactBtn"><a class="call">Contact</a></p>
        </div>
    </div>`
  
        return html;          
    },

    clearFields: function(){
        firstName = $('#first_name').val('');
        lastName = $('#last_name').val('');
        title = $('#title').val('');
        company = $('#company').val('');
        phone = $('#phone').val('');
        email = $('#email').val('');

    },

    
   showMessage: function(messageText){
    
    $('.alert').empty().append(messageText).show().fadeOut(2600);
   },

   phoneCall: function(){

       
   }

}


$(document).ready(function () {

contacts.init();

});