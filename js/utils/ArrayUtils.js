 export  default  class ArrayUtils{
    //更新数组，若item已存在就将他移除，否则添加进数组
     static  updateArray(array,item)
     {
         for(var i=0;i<array.length;i++)
         {
             var temp=array[i];
             if (temp===item)
             {
                 array.slice(i,1);
                 return;
             }

         }
         array.push(item)
     }
 }
