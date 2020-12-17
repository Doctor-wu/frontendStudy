# 前端安全



## XSS(跨站脚本攻击)

反射型攻击  你给我啥，我就给你啥，像照镜子一样

http://localhost:3000/welcome?type=\<script>alert(document.cookie)\</script>

Chrome发现路径存在异常 会有XSS屏蔽功能

存储型攻击 恶意的脚本存储到了服务器上，所有人访问时都会造成攻击，比反射型攻击和Dom-Based攻击影响更大



**处理方法**

返回信息时把信息用encodeURIComponent转义

用户输入文本内容时，为了防止DOM-Based攻击，需要转义输入的内容

前端防君子不防小人，所以服务端最好再过滤(转义)一次内容

## CSRF(跨站请求伪造)