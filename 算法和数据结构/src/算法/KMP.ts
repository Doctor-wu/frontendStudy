export class KMP{
    static getNext(template:string):Array<number>{
        let next:number[] = [-1],i:number,len:number,j:number;
        for(j=1; j<template.length;j++){
            for(len = j-1; len>=1; len--){
                for(i = 0; i<len; i++){
                    if(template[i] !== template[j-len+i]) break;
                }

                if(i===len){
                    next[j] = len;
                    break;
                }
            }
            if(len<1) next[j] = 0;
        }

        return next;
    }
    static compare(mainStr:string, template:string) {
        let next = KMP.getNext(template),
            i:number = 0,
            j:number = 0,
            k:number = 0,
            ml:number = mainStr.length,
            tl:number = template.length;

        while(i<=ml && j<tl){
            if(mainStr[i] === template[j]){
                i++;
                j++;
            }else{
                k = next[j];
                if(k<0) {
                    j = 0;
                    i++;
                }else{
                    j = k;
                }
            }
        }
        if(j===tl) return i-j;
        return -1;
    }
}
