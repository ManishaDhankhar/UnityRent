package com.example.myapplication.ui.theme.Screen

import com.example.myapplication.R
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.graphics.Color
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Divider
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen() {

    Column(
        modifier = Modifier
            .fillMaxSize()
    ) {

        Spacer(modifier = Modifier.height(14.dp))
        Text(
            text = "UnityRent",
            fontSize = 34.sp,
            fontWeight = FontWeight.Bold,
            color = colorResource(R.color.primary_blue) ,
            modifier = Modifier.padding(top =20.dp , start = 16.dp )
        )

        Spacer(modifier = Modifier.height(7.dp))

        Divider(
            modifier = Modifier.fillMaxWidth(),
            color = colorResource(R.color.primary_blue) ,
            thickness = 1.dp
        )
        Spacer(modifier = Modifier.height(25.dp))
    }


    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp, top = 60.dp, end = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(30.dp))


        Text(
            text = "Rent premises\nand equipment\nhassle-free",
            fontSize = 48.sp,
            fontWeight = FontWeight.Bold,
            lineHeight = 44.sp
        )

        Spacer(modifier = Modifier.height(20.dp))


        Text(
            text = "Now we are here for those of you who are looking for equipment to rent camping gear",
            fontSize = 14.sp,
            color = Color(0xFF6B6B6B)
        )

        Spacer(modifier = Modifier.height(40.dp))


        Image(
            painter = painterResource(id = R.drawable.img_2),
            contentDescription = null,
            modifier = Modifier
                .fillMaxWidth()

            ,
            contentScale = ContentScale.Crop
        )

        Spacer(modifier = Modifier.height(60.dp))



        OutlinedButton(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(
                text = "Find your equipment here",
                color = Color.Black,
                fontWeight = FontWeight.Bold
            )
        }
        Spacer(modifier = Modifier.height(15.dp))

        // Button
        Button(
            onClick = {},
            modifier = Modifier
                .fillMaxWidth()
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor =   colorResource(R.color.primary_blue)
            ),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text(
                text = "Looking For Now",
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
        }




    }
}