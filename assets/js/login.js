$(function(){
    $('#link1').on('click',function(){
        $('.regBox').show()
        $('.loginBox').hide()
    })
    $('#link2').on('click',function(){
        $('.regBox').hide()
        $('.loginBox').show()
    })
    // 发起ajax请求登录
    $('#login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:"/api/login",
            data:{username:$('#login [name=username]').val(),password:$('#login [name=password]').val()},
            success:function(res){
                if(res.status!=0){
                    return layer.msg(res.message)
                }
               layer.msg(res.message)
               console.log(res.token)
               localStorage.setItem('token',res.token)
               location.href ="/login.html"
            }
        })
    })
    // ajax发起注册
    $("#reg").on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:"/api/reguser",
            data:{username:$('#reg [name=username]').val(),password:$('#reg [name=password]').val()},
            success:function(res){
                if(res.status!=0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link2').click()
            }
        })
    })
})
var form =layui.form
var layer = layui.layer
form.verify({
    password:[/^[\S]{6,12}$/,
    '密码必须6到12位，且不能出现空格'],
    repaw:function(value){
        var val =$('.regBox [name=password]').val()
        if(val!=value){
            return '两次密码不一致,重新输入'
        }
    }
})