import { Oval, OvalProps } from 'react-loader-spinner';

export const Spinner = (props: OvalProps) => (
  <Oval
    visible={true}
    height='60'
    width='60'
    color='#606060'
    secondaryColor='#555555'
    ariaLabel='oval-loading'
    wrapperStyle={{}}
    wrapperClass=''
    strokeWidth='4'
    {...props}
  />
);
