package com.QTcsdl.pixel_arena.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Pixel")
@IdClass(PixelId.class)  //báo cho JPA biết dùng class pixelId làm khóa
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pixel {

    @Id
    private int x;
    @Id
    private int y;

    private String color;

    @Column(name = "updatedBy")
    private String updatedBy;
    
    @Version
    private Integer version;
}
