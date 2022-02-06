import { useState } from 'react'
export default function Home() {

  const [original, setOriginal] = useState('')
  const [key, setKey] = useState('')
  const [encrypt, setEncrypt] = useState('')
  function generateKey(str,key)
  {
    key=key.split("");
    if(str.length == key.length)
      return key.join("");
    else
    {
      let temp=key.length;   
      for (let i = 0;i<(str.length-temp) ; i++)
      {    
        key.push(key[i % ((key).length)])
      }
    }
    return key.join("");
  }
function cipherText(str,key)
  {
    let cipher_text="";
  
    for (let i = 0; i < str.length; i++)
    {
      // converting in range 0-25
      let x = (str[i].charCodeAt(0) + key[i].charCodeAt(0)) %26;

      // convert into alphabets(ASCII)
      x += 'A'.charCodeAt(0);

      cipher_text+=String.fromCharCode(x);
    }
    return cipher_text;
  }
  // This function decrypts the encrypted text
// and returns the original text

function decryptText(str, key) {
  let originalText = ''
  for(let i = 0; i< str.length; i++) {
    // find the number from range 0-25
    let z = (str[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26
    z += 'A'.charCodeAt(0)
    originalText += String.fromCharCode(z)
  }
  return originalText
}
function LowerToUpper(s)
{
  s = s.toUpperCase()
  return s;
}
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleChange = event => {
    const target = event.target.name
    if (target === "original") {
      setOriginal(event.target.value)
    } else if (target === "key") {
      setKey(event.target.value)
    } else {
      setEncrypt(event.target.value)
    }
  }
  const encrypted = () => {
    const text = LowerToUpper(original)
    const generatedKey = generateKey(text, key)
    const encrypted = cipherText(text, generatedKey)
    setEncrypt(encrypted)
  }
  const decrypted = () => {
    const text = LowerToUpper(encrypt)
    const generatedKey = generateKey(text, key)
    const decrypted = decryptText(encrypt, generatedKey)
    setOriginal(decrypted)
  }
  return (
    <div className='p-2'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col text-white'>
          <label>
            Text to Encrypt:
            <input name="original"type="text" value={original} onChange={handleChange}/>
          </label>
          <label>
            Encryption Key:
            <input name="key" type="text" value={key} onChange={handleChange}/>
          </label>
          {/* <label>
            Encrypted Text:
            <input name="encrypted" type="text" value={encrypt} onChange={handleChange}/>
          </label> */}
          <button onClick={encrypted}>Encrypt</button>
          <button onClick={decrypted} disabled={!encrypt}>Decrypt</button>
        </div>
       
      </form>
      Results:
      <div>Original Message:{original}</div>
      <div>Encrypted Message:{encrypt}</div>
    </div>
  )
}
