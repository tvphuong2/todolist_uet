import React, { useEffect, useState } from "react";
import { View, StyleSheet } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const ReviewVote = (props) => {
    const {vote} = props;
    const [voteInteger, setVoteInteger] = useState(0);
    const [voteDecimals, setVoteDecimals] = useState(0);

    useEffect(() => {
        const voteInt = Number((vote * 10).toString().charAt(0));
        const voteDec = Number((vote * 10).toString().charAt(1));
        setVoteInteger(voteInt);
        setVoteDecimals(voteDec);
    }, [])

    var star = [];
    for (let i = 1; i <= voteInteger; i++) {
        star.push(
            <FontAwesome style={styles.icon} key={i} name="star" size={16} color="#ffce3d" />
        )
    }
    if (voteDecimals === 0) {
        for (let i = 5; i > voteInteger; i--) {
            star.push(
                <FontAwesome style={styles.icon} key={i} name="star-o" size={16} color="#ffce3d" />
            )
        }
    } else {
        star.push(
            <FontAwesome style={styles.icon} key={voteInteger+1} name="star-half-o" size={16} color="#ffce3d" />
        )
        for (let i = 5; i > voteInteger + 1; i--) {
            star.push(
                <FontAwesome style={styles.icon} key={i} name="star-o" size={16} color="#ffce3d" />
            )
        }
    }

    return (
        <View style={styles.vote}>{star}</View>
    )
}

export default ReviewVote;

const styles = StyleSheet.create({
    vote: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 3
    }
})