import { NavigateFunction } from 'react-router-dom';

export class ValidateAccess {
  static verify = (code: string, navigate: NavigateFunction) => {
    const storagedCode = localStorage.getItem('@Wodful:access');
    const publicChampName = localStorage.getItem('@Wodful:pcname');
    if (!code || !storagedCode) {
      localStorage.removeItem('@Wodful:access');
      localStorage.removeItem('@Wodful:pcname');
      return navigate('/access');
    }
    if (code !== storagedCode) {
      localStorage.removeItem('@Wodful:access');
      localStorage.removeItem('@Wodful:pcname');
      return navigate('/access');
    }

    return publicChampName;
  };
}
