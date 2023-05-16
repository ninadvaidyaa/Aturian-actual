import type * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";


export default function BasicBreadcrumbs(props: { links: Array<string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined>; }) {
  const params = useParams();
  const Id =Object.values(params)[0];
 
  useEffect(() => {
    
    // Id = Object.values(params)[0]
  }, [params]);
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

{index === (props.links.length-1) && !Id &&
                <Typography  color="text.primary">{row}</Typography>
}
{index === (props.links.length-1) && Id &&
                 <Link underline="hover" color="inherit"  aria-disabled={true}> 
                 {row}
               </Link>           
        
      }
      </div>
        ))}
       {Id &&  <Typography  color="text.primary">{Id}</Typography> }
       
      </Breadcrumbs>
    </div>
  );
}