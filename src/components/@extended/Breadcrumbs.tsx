import type * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



export default function BasicBreadcrumbs(props: { links: Array<string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined>; }) {

 
 
  return (
    <div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
      {props.links?.map((row,index) => (  
        <div key={index}>
      {index !== (props.links.length-1) && 
        <Link underline="hover" color="inherit"  aria-disabled={true}> 
          {row}
        </Link>
        
      }

{index === (props.links.length-1) && 
                <Typography  color="text.primary">{row}</Typography>
        
      }
      </div>
        ))}
       
      </Breadcrumbs>
    </div>
  );
}