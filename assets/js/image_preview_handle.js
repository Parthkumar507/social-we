{
        const inpFile=document.getElementById("inpFile")
        const previewContainer=document.getElementById("imagePreview")
        const previewImage=previewContainer.querySelector(".image-preview_image")
        const previewDefaultText=previewContainer.querySelector(".image-preview_default_text")

        inpFile.addEventListener("change",function(){
            const file=this.files[0];

            if(file){
                const reader=new FileReader();

                previewDefaultText.style.display="none";
                previewImage.style.display="block"

                reader.addEventListener("load",function(){
                    previewImage.setAttribute("src",this.result)
                })

                reader.readAsDataURL(file)

            }else{
                previewDefaultText.style.display=null;
                previewImage.style.display=null

            }  
        })
}