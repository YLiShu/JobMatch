import axios from "axios"

export function parseResume(file: FormData, token: string) {
  
  return axios.post('http://47.108.153.136:8000/qes/', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'bearer ' + token
    }
  });
}