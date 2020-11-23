import React from 'react'
import {StarIcon} from '../Icons/StarIcon';
import {Colors} from 'react-native-ui-lib';
import { TouchableOpacity } from 'react-native-ui-lib';

export default class StarIconsPopUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            BrandRating:0,
            stars : [false,false,false,false,false]
        }
    }

    onPress(rating){
        //this.setState({BrandRating:rating+1})
        this.state.BrandRating = rating + 1;
        let i,num=[];

        for (i = 0; i < this.state.BrandRating; i++) {
            num.push(true);
        }
        for (i = this.state.BrandRating; i < 5; i++) {
            num.push(false);
        }
        this.setState({stars: num, BrandRating: this.state.BrandRating});
    }

    render() {
        return this.state.stars.map((name,i) => {
            return (
                <TouchableOpacity key={i} onPress={() => this.onPress(i)}>
                    <StarIcon
                        // key={i.toString()}
                        Fill={name}
                        height={this.props.height ? this.props.height : 15}
                        width={this.props.width ? this.props.width : 15}
                        Color={Colors.primary}
                    />
                </TouchableOpacity>
            );
        });
    }    
    
}


// function Star( props ){
//     return (
//       <div className={`star ${(props.value == 0) ? 'semi-active' : ''} ${(props.position <= props.rated) ? 'active' : ''} `} 
//            onMouseEnter={ props.onMouseEnter }
//            onMouseLeave={ props.onMouseLeave }
//            onClick={ props.onClick }
  
//       >
//         <i className="fas fa-star"></i>
//       </div>
//     );
//   }
  
//   function Rating( props ){
//     const messages = {
//       "1": "Oh. Sorry you had a bad experience :( ",
//       "2": "We will try to improve.",
//       "3": "Appreciate it!",
//       "4": "Thank you!", 
//       "5": "You're Awesome!"
//     };
    
//     let rating = props.rating;
    
//     return(
//         <div className={"after-rating-message " + ((rating > 0) ? 'show': '')} >
//             <span>You rated this {rating} star{rating > 1 ? 's' : ''}</span>
//             <br/>
//             <span>{ messages[rating] }</span>
//         </div>
//     );
//   }
  
  
//   class RatingWidget extends React.Component {
//     constructor( props ) {
//       super( props );
//       this.state = {
//         stars: Array(5).fill(-1),
//         rated: 0
//       };
//     }
    
//     handleClick( i ) {
//       const clickedStar = this.state.stars.slice();
      
//       _.fill( clickedStar, 1, 0, i );
//       _.fill( clickedStar, 1, i, clickedStar.length );
        
//       this.setState({
//         stars: clickedStar,
//         rated: i
//       });
//     }
    
    
//     handleRating( rating ){
//       return (<Rating rating={this.state.rated} />)
//     }
    
//     renderStar( i ){
//       return (
//         <Star 
//           position={i}
//           value={this.state.stars[i]} 
//           rated={this.state.rated}
//           onMouseEnter={ () => this.handleMouseOver(i) }
//           onMouseLeave={ () => this.handleMouseOut() }
//           onClick={ () => this.handleClick(i) }
//           />
//       );
//     }
    
//     render(){
//       return (
//         <div className='rating-stars-widget-outer'>
//             <div className='rating-stars'>
//               {this.renderStar(1)}
//               {this.renderStar(2)}
//               {this.renderStar(3)}
//               {this.renderStar(4)}
//               {this.renderStar(5)}
//             </div>
          
//             {this.handleRating( this.state.rated )}
//         </div>
        
        
//       );
//     }
// }