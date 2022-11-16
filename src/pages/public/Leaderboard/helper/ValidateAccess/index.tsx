import { NavigateFunction } from 'react-router-dom';

export class ValidateAccess {
  static verify = (code: string, navigate: NavigateFunction) => {
    const storagedCode = localStorage.getItem('@Wodful:access');
    if (!code || !storagedCode) {
      localStorage.removeItem('@Wodful:access');
      return navigate('/access');
    }
    if (code !== storagedCode) {
      localStorage.removeItem('@Wodful:access');
      return navigate('/access');
    }
  };
}
