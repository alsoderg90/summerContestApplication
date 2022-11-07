﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using app.Models;

#nullable disable

namespace app.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20221106174230_TeamsPrimaryKey")]
    partial class TeamsPrimaryKey
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.10");

            modelBuilder.Entity("app.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lat")
                        .HasColumnType("TEXT");

                    b.Property<string>("Lon")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("app.Models.Member", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FlagUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Nationality")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("TeamId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("TeamId");

                    b.ToTable("Members");
                });

            modelBuilder.Entity("app.Models.Point", b =>
                {
                    b.Property<int?>("MemberId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("LocationId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Points")
                        .HasColumnType("INTEGER");

                    b.HasKey("MemberId", "LocationId");

                    b.HasIndex("LocationId");

                    b.ToTable("Points");
                });

            modelBuilder.Entity("app.Models.Team", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("app.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("app.Models.Member", b =>
                {
                    b.HasOne("app.Models.Team", "Team")
                        .WithMany("Members")
                        .HasForeignKey("TeamId");

                    b.Navigation("Team");
                });

            modelBuilder.Entity("app.Models.Point", b =>
                {
                    b.HasOne("app.Models.Location", "Location")
                        .WithMany("Points")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("app.Models.Member", "Member")
                        .WithMany("Points")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Location");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("app.Models.Location", b =>
                {
                    b.Navigation("Points");
                });

            modelBuilder.Entity("app.Models.Member", b =>
                {
                    b.Navigation("Points");
                });

            modelBuilder.Entity("app.Models.Team", b =>
                {
                    b.Navigation("Members");
                });
#pragma warning restore 612, 618
        }
    }
}
