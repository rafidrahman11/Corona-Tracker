import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, ...props }) {
    return (
        <div className="infobox">
            <Card onClick={props.onClick} className="infobox__card">
                <CardContent>
                    <Typography className="infobox__title" color="textSecondary">
                        {title}
                    </Typography>
                    <h3> {cases} </h3>
                    <Typography className="infobox__total" color="textSecondary">
                        {total} Total
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
