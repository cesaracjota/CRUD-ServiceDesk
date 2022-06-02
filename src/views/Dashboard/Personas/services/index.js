import URL from '../../../../http-common';

export async function getPersonas() {
  try {
    const response = await URL({
      url: '/personas',
      method: 'GET'
    })
    return response;
    
  } catch (e) {
    console.log(e)
  }
}

export async function postPersonas() {
    try {
      const response = await URL({
        url: '/personas',
        method: 'POST'
      })
      return response;
      
    } catch (e) {
      console.log(e)
    }
}